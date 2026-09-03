import emailjs from "@emailjs/browser";

type ContactForm = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

emailjs.init("sGt2uPNIC_TauYCLL");

export const sendEmail = async (formData: ContactForm) => {
  try {
    const response = await emailjs.send(
      "service_0llcxuo",
      "template_iiq9w5k",
      {
        from_name: formData.name,
        from_email: formData.email,
        subject: formData.subject,
        message: formData.message,
      }
    );
    return { success: true, response };
  } catch (error) {
    console.error("EmailJS error:", error);
    return { success: false, error };
  }
};