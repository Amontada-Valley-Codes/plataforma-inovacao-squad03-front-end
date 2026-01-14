export type PropsCard = {

    id: string;
    name: string;
    startDate: string;
    endDate: string;
    sector: string;
    description: string;
    publishOption: "PUBLIC" | "RESTRICTED";
    corporationId: string;
    status: string;
    corporation: {
        tradingName: string
        logo: [{
            url: string
            public_id: string
        }]
    }
}

export type PropsCardKanban = {

    id: string;
    name: string;
    startDate: string;
    endDate: string;
    sector: string;
    description: string;
    publishOption: "PUBLIC" | "RESTRICTED";
    corporationId: string;
    status: string;
    corporation: {
        tradingName: string
        logo: [{
            url: string
            public_id: string
        }]
    }
    setReload: (prev: boolean) => void;
    realod: boolean
}

export type PropsFormChallenger = {
    setReload: (prev: boolean) => void;
    realod: boolean;
    id: string;
}

export type PropsSessionComment = {
    challangerId: string
}

export type PropsComment = {
  id: string;
  content: string;
  createdAt: string;
  challengerId: string;
  userId: string
  user: {
    name: string;
    role: string;
  }
}

export type PropsCardComment = {
  id: string;
  content: string;
  createdAt: string;
  challengerId: string;
  userId: string;
  user: {
    name: string;
    role: string;
  }
  commentsUpload: boolean;
  setCommentsUpload: (prev: boolean) => void;
}

export type PropsInputComments = {
    challengerId: string;
    commentsUpload: boolean;
    setCommentsUpload: (prev: boolean) => void;
}

export type CardObjectiveProps = {
    id: string;
    content: string;
    createDate: string
    ObjectiveUpload: boolean;
    setObjectUpload: (prev: boolean) => void;
}

export type InputObjectiveProps = {
    ObjectiveUpload: boolean;
    setObjectUpload: (prev: boolean) => void;
}