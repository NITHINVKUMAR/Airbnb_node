export interface NotificationDTO {
  to: string; // email address of the recipient
  subject: string; // subject of the email
  templateId: string; // template name to be used for email body
  params: Record<string, any>; // parameters to be replaced in the template , where record is object with key value pair
}
