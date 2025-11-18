import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendConfirmationEmail(
  email: string,
  postId: number,
  title: string
) {
  try {
    console.log("🔍 Tentando enviar email...");
    console.log("📧 Para:", email);

    // ✅ Fallback para localhost se não estiver definido
    const baseUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
    const token = generateToken(postId);
    const confirmUrl = `${baseUrl}/api/confirm-post?id=${postId}&token=${token}`;

    console.log("🔗 URL de confirmação:", confirmUrl);

    const result = await resend.emails.send({
      from: "Wiki UDESC <noreply@elcio.dev>",
      to: email,
      subject: "Confirme seu post - Wiki UDESC",
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1 style="color: #333;">Confirme seu post</h1>
          <p>Olá! Você criou um novo post na Wiki UDESC.</p>
          <p><strong>Título:</strong> ${title}</p>
          <p>Clique no botão abaixo para confirmar e publicar seu post:</p>
          <a href="${confirmUrl}" 
             style="display: inline-block; 
                    background-color: #0070f3; 
                    color: white; 
                    padding: 12px 24px; 
                    text-decoration: none; 
                    border-radius: 5px; 
                    margin: 20px 0;">
            Confirmar Post
          </a>
          <p style="color: #666; font-size: 14px;">
            Se você não criou este post, pode ignorar este email.
          </p>
        </div>
      `,
    });

    console.log("✅ Email enviado com sucesso!", result);
    return result;
  } catch (error) {
    console.error("❌ Erro ao enviar email:", error);
    throw error;
  }
}

function generateToken(postId: number) {
  return Buffer.from(`${postId}-${Date.now()}`).toString("base64");
}
