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
        logo: {
            url: string
            public_id: string
        }
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
        logo: {
            url: string
            public_id: string
        }
    }
    setReload: (prev: boolean) => void;
    realod: boolean
}

export type PropsFormChallenger = {
    setReload: (prev: boolean) => void;
    realod: boolean;
    id: string;
}