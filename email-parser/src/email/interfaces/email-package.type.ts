export type Attachment = {
  filename: string;
  content: string;
};

export type MailObject = {
  attachments: Attachment[];
  headers: any;
  text: any;
};
