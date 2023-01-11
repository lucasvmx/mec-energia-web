export interface RecommendationSettings {
    MINIMUM_PERCENTAGE_DIFFERENCE_FOR_CONTRACT_RENOVATION: number
    MINIMUM_ENERGY_BILLS_FOR_RECOMMENDATION: number
    IDEAL_ENERGY_BILLS_FOR_RECOMMENDATION: number
}

type TariffFlag = 'B' | 'G'

export interface Recommendation {
    energyBillsCount: number,
    costsPercentageDifference: number,
    shouldRenewContract: boolean,
    errors: string[],
    generatedOn: string,
    plotConsumptionHistory: {
        date: string[],
        peakConsumptionInKwh: number[],
        offPeakConsumptionInKwh: number[],
        peakMeasuredDemandInKw: number[],
        offPeakMeasuredDemandInKw: number[],
    }
    currentContract: {
        university: string,
        distributor: string,
        consumerUnit: string,
        consumerUnitCode: string,
        supplyVoltage: string,
        tariffFlag: TariffFlag,
        subgroup: string,
        peakContractedDemandInKw: string,
        offPeakContractedDemandInKw: string,
    },
    plotCurrentVsEstimatedCosts: {
        totalCostInReaisInCurrent: number[],
        totalCostInReaisInRecommended: number[],
        totalTotalCostInReaisInCurrent: number,
        totalTotalCostInReaisInRecommended: number,
    },
    recommendedContract: {
        university: string,
        distributor: string,
        consumerUnit: string,
        consumerUnitCode: string,
        supplyVoltage: number,
        subgroup: string,
        tariffFlag: TariffFlag,
        offPeakDemandInKw: number,
        peakDemandInKw: number,
    },
    // 'tableTariffs': table_tariffs,
    // 'plotCurrentContractDemands': current_demands,
    // 'plotCurrentContractDemandAndConsumptionCosts': current_demand_and_consumption_costs,
    // 'plotRecommendedDemands': recommended_demands,
    // 'plotCurrentVsEstimatedCosts': '',
    // 'plotRecommendedDemandAndConsumptionCosts': demands_and_consumption_costs_in_recommended_contract,
    // 'tableCurrentVsRecommendedContract': current_vs_recommended_contract,
}
