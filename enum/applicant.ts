// 媒体
export enum Site {
  Recruit = 1,
  Mynavi,
  Doda,
}
export const dispApplicantSite = (n: number): string => {
  switch (n) {
    case Site.Recruit:
      return 'features.applicant.site.recruit'
    case Site.Mynavi:
      return 'features.applicant.site.mynavi'
    case Site.Doda:
      return 'features.applicant.site.doda'
    default:
      return 'TODO'
  }
}

// 応募者ステータス
export enum ApplicantStatus {
  // 日程未回答
  ScheduleUnanswered,
  // 日程回答済み
  ScheduleAnswered,
  // 書類提出済み
  DocumentsSubmitted,
  // 内定
  Offer,
  // 内定承諾済み
  InternalCommitments,
  // 日程回答期限超過
  CalendarAnswerDeadlineExceeded,
  // 書類提出期限超過
  DeadlineForSubmissionOfBooksExceeds,
  // 書類選考落ち
  FailingToPassThePhysicalExamination,
  // 面接落ち
  FailingAnInterview,
  // 選考辞退
  Withdrawal,
  // 内定辞退
  InternalizedDismissal,
  // 内定承諾後辞退
  DismissalAfterInternalCommitment,
}
export const dispApplicantStatus = (n: number): string => {
  switch (n) {
    case ApplicantStatus.ScheduleUnanswered:
      return 'features.applicant.status.scheduleUnanswered'
    case ApplicantStatus.ScheduleAnswered:
      return 'features.applicant.status.scheduleAnswered'
    case ApplicantStatus.DocumentsSubmitted:
      return 'features.applicant.status.documentsSubmitted'
    case ApplicantStatus.Offer:
      return 'features.applicant.status.offer'
    case ApplicantStatus.InternalCommitments:
      return 'features.applicant.status.internalCommitments'
    case ApplicantStatus.CalendarAnswerDeadlineExceeded:
      return 'features.applicant.status.calendarAnswerDeadlineExceeded'
    case ApplicantStatus.DeadlineForSubmissionOfBooksExceeds:
      return 'features.applicant.status.deadlineForSubmissionOfBooksExceeds'
    case ApplicantStatus.FailingToPassThePhysicalExamination:
      return 'features.applicant.status.failingToPassThePhysicalExamination'
    case ApplicantStatus.FailingAnInterview:
      return 'features.applicant.status.failingAnInterview'
    case ApplicantStatus.Withdrawal:
      return 'features.applicant.status.withdrawal'
    case ApplicantStatus.InternalizedDismissal:
      return 'features.applicant.status.internalizedDismissal'
    case ApplicantStatus.DismissalAfterInternalCommitment:
      return 'features.applicant.status.dismissalAfterInternalCommitment'
    default:
      return 'TODO'
  }
}
