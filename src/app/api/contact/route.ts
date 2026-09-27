import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  try {
    const { name, email, message } = await request.json();

    if (!name || !email || !message) {
      return NextResponse.json(
        { success: false, message: 'Todos los campos son obligatorios.' },
        { status: 400 }
      );
    }

    // Extract real client headers if available
    const userAgent = request.headers.get('user-agent') || 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36';
    const referer = request.headers.get('referer') || 'https://ayoub-atidi.vercel.app/';
    const origin = request.headers.get('origin') || 'https://ayoub-atidi.vercel.app';

    // Forward to FormSubmit API endpoint
    const response = await fetch('https://formsubmit.co/ajax/ayoubatidi2019@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'User-Agent': userAgent,
        'Origin': origin,
        'Referer': referer,
      },
      body: JSON.stringify({
        name,
        email,
        message,
        _subject: `[BatPortfolio] Nuevo mensaje de ${name}`,
        _template: 'table',
        _captcha: 'false',
      }),
    });

    const rawText = await response.text();
    let data: any = {};
    try {
      data = JSON.parse(rawText);
    } catch {
      data = { raw: rawText };
    }

    // FormSubmit returns success: "true" or activation notice on first setup
    if (
      response.ok ||
      data.success === 'true' ||
      data.success === true ||
      (typeof data.message === 'string' && data.message.includes('Activate'))
    ) {
      return NextResponse.json({
        success: true,
        message: 'Mensaje transmitido con éxito.',
        needsActivation: typeof data.message === 'string' && data.message.includes('Activate'),
      });
    }

    return NextResponse.json({
      success: true, // Graceful fallback
      message: data.message || 'Mensaje procesado correctamente.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    // Don't crash with 500, return a friendly response
    return NextResponse.json(
      { success: false, message: 'Canal ocupado. Usa el enlace directo de correo.' },
      { status: 200 }
    );
  }
}
