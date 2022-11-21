export interface MenuCP{
  idMenu: number,
  name: string,
  url: string,
  logo: string,
  tooltip: null,
  orden: null,
  songs: null,
  permits: Array<Permits>
}

export interface Permits{
  name: string,
  index: number
}

export interface EmailCN{
  email:string;
}

export interface DataCP{
  message: string,
  succeeded: boolean,
  errors: string[],
  data: any;
}

export interface EmpresaCP{
  id:number,
  companyProfileId:number,
  companyName:string,
  companyId:number,
  industryMainSector:{},
  name: string,
  identifier: string,
  country:string,
  city: string,
  sector:string,
  email:string,
  phone:number,
  industries:[];
};

export interface CompanyInterestCP{
  idCompanyInterest: number,
  idCompanyProfile: number,
  interestType: string,
  allDepartements: boolean,
  allMunicipalities: boolean,
  allStage: boolean,
  companies: string, //este no me queda claro
  allMode: boolean,
  allValues: boolean,
  minimumValues: number,
  maximumValues: number,
  includeValues: boolean,
  departments: any[],
  municipalities:any[],
  stages:any[],
  modes:any[],
  classifiers:any[],
  months: any[]
}

export interface DepartamentoCP{
  id:number,
  name: string,
  municipalities:[]
};

export interface EntidadCP{
  id:number,
  name: string
};

export interface CiudadCP{
  id:number,
  name: string
};

export interface StageCP{
  id:number,
  name: string
};

export interface ModeCP{
  id:number,
  name: string
};
