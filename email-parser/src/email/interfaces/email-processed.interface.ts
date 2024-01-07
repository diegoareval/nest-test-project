
export type ProcessedEmail = {
    success: boolean;
    data:    EmailData;
    message?: string | object
}

export interface EmailData {
    attachments: any[];
    text:        Text;
    headers:     Headers;
}

export interface Headers {
    from:    From;
    to:      From;
    subject: string;
    date:    string;
}

export interface From {
    value: Value[];
    html:  string;
    text:  string;
}

export interface Value {
    address: string;
    name:    string;
}

export interface Text {
    type:       string;
    text:       string;
    textAsHtml: string;
}
