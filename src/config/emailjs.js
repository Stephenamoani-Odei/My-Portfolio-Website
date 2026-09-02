import emailjs from "@emailjs/browser";

// Initialize EmailJS with your public key
emailjs.init("sGt2uPNIC_TauYCLL");

export const sendEmail = async (formData) => {
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
