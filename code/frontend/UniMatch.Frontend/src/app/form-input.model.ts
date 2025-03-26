export interface inputInformation {
    continent: string;  //continent
    
    rankMin: number;    //university rank
    rankMax: number;
    rankPrio: number;

    safetyMin: string;  //safety index
    safetyMax: string;
    safetyPrio: number;

    accMin: number;     //acceptance rate
    accMax: number;
    accPrio: number; 

    ISRMin: number;     //international student ratio
    ISRMax: number;
    ISRPrio: number;

    CoLMin: number;     //cost of living
    CoLMax: number;
    CoLPrio: number;

    rentMin: number;    //rent
    rentMax: number;
    rentPrio: number;

    groceryMin: number;   //groceries
    groceryMax: number;
    groceryPrio: number;

    transportMin: number;   //transport
    transportMax: number;
    transportPrio: number;

    recreationMin: number;  //recreation
    recreationMax: number;
    recreationPrio: number;

    healthcareBudgetMin: number;  //healthcare budget
    healthcareBudgetMax: number;
    healthcareBudgetPrio: number;

    tuitionBudgetMin: number;     //tuition budget
    tuitionBudgetMax: number;
    tuitionBudgetPrio: number; 

    major: string;               //major







}