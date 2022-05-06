import { MailAdapter } from "../adapters/mail-adapter";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackUseCaseRequest {
  type: string;
  comment: string;
  screenshot?: string;
}

export class SubmitFeedbackUseCase {
  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
  ) {}

  async execute(request: SubmitFeedbackUseCaseRequest) {
    const { type, comment, screenshot } = request;

    if(!type) {
      throw new Error('Type is requrired.');
    }

    if(!comment) {
      throw new Error('Comment is requrired.');
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')) {
      throw new Error('Invalid screenshot format.');
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendMail({
      subject: 'Novo Feedback',
      body: [
        `<div style="font-family: sans-serif; font-size: 16px; color: #111">`,
        `<p><strong>Tipo do feedback:</strong> ${type}</p>`,
        `<p><strong>Comentário:</strong> ${comment}</p>`,
        screenshot ? `<img src="${screenshot}">` : ``,
        `<div>`,
      ].join('\n')
    })
  }
}