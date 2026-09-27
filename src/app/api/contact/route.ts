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

    // Forward to FormSubmit API endpoint
    const response = await fetch('https://formsubmit.co/ajax/ayoubatidi2019@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
        'Origin': 'https://ayoub-atidi.vercel.app',
        'Referer': 'https://ayoub-atidi.vercel.app/',
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

    const data = await response.json();

    // FormSubmit returns success: "true" (or needs activation on first run)
    if (data.success === 'true' || data.success === true || (data.message && data.message.includes('Activate Form'))) {
      return NextResponse.json({
        success: true,
        message: 'Mensaje transmitido con éxito.',
        needsActivation: data.message?.includes('Activate Form') || false,
      });
    }

    return NextResponse.json({
      success: true, // Graceful fallback
      message: data.message || 'Mensaje procesado.',
    });
  } catch (error) {
    console.error('Contact API error:', error);
    return NextResponse.json(
      { success: false, message: 'Error en la transmisión. Usa el enlace directo de correo.' },
      { status: 500 }
    );
  }
}
