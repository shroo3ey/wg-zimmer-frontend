export interface ContactFormData {
  roomId: string;
  roomTitle: string;
  senderName: string;
  senderEmail: string;
  senderPhone?: string;
  message: string;
  roomOwnerEmail?: string;
  roomOwnerName?: string;
}

export interface EmailResponse {
  success: boolean;
  message: string;
}

// Mock implementation — logs to console instead of hitting the backend
export const sendContactEmail = async (data: ContactFormData): Promise<EmailResponse> => {
  console.log('Mock email sent:', data);
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  return {
    success: true,
    message: 'E-Mail erfolgreich gesendet (Mock)',
  };
};