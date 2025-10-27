export type PropsProfile = {
  id: string;
  name: string;
  email: string;
  role: string;
  companyInformation: {
    type: string;
    data: {
      id: string;
      tradingName: string;
      legalName: string;
      cnpj: string;
      generalEmail: string;
      foundationDate: string;
      website: string;
      sector: string;
      mainAddress: string;
      size: string;
      mainPhone: string;
    }
  }
}

export type PropsProfileStar = {
  id: string;
  name: string;
  email: string;
  role: string;
  companyInformation: {
    type: string;
    data: {
      id: string;
      name: string;
      cnpj: string;
      ContactEmail: string;
      areaOfExpertise: string;
      location: string;
    }
  }
}

