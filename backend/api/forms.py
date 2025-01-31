class Forma:
    def __init__(self, continent=None, rankMin=None, rankMax=None, rankPrio=None, safetyMin=None, safetyMax=None,
                 safetyPrio=None, accMin=None, accMax=None, accPrio=None, ISRMin=None, ISRMax=None, ISRPrio=None,
                 CoLMin=None, CoLMax=None, CoLPrio=None, rentMin=None, rentMax=None, rentPrio=None, groceryMin=None,
                 groceryMax=None, groceryPrio=None, transportMin=None, transportMax=None, transportPrio=None,
                 recreationMin=None, recreationMax=None, recreationPrio=None, healthcareBudgetMin=None,
                 healthcareBudgetMax=None, healthcareBudgetPrio=None, tuitionBudgetMin=None, tuitionBudgetMax=None,
                 tuitionBudgetPrio=None, major=None):
        self.continent = continent
        self.rankMin = rankMin
        self.rankMax = rankMax
        self.rankPrio = rankPrio
        self.safetyMin = safetyMin
        self.safetyMax = safetyMax
        self.safetyPrio = safetyPrio
        self.accMin = accMin
        self.accMax = accMax
        self.accPrio = accPrio
        self.ISRMin = ISRMin
        self.ISRMax = ISRMax
        self.ISRPrio = ISRPrio
        self.CoLMin = CoLMin
        self.CoLMax = CoLMax
        self.CoLPrio = CoLPrio
        self.rentMin = rentMin
        self.rentMax = rentMax
        self.rentPrio = rentPrio
        self.groceryMin = groceryMin
        self.groceryMax = groceryMax
        self.groceryPrio = groceryPrio
        self.transportMin = transportMin
        self.transportMax = transportMax
        self.transportPrio = transportPrio
        self.recreationMin = recreationMin
        self.recreationMax = recreationMax
        self.recreationPrio = recreationPrio
        self.healthcareBudgetMin = healthcareBudgetMin
        self.healthcareBudgetMax = healthcareBudgetMax
        self.healthcareBudgetPrio = healthcareBudgetPrio
        self.tuitionBudgetMin = tuitionBudgetMin
        self.tuitionBudgetMax = tuitionBudgetMax
        self.tuitionBudgetPrio = tuitionBudgetPrio
        self.major = major

    def to_dict(self):
        return {
            "continent": self.continent,
            "rankMin": self.rankMin,
            "rankMax": self.rankMax,
            "rankPrio": self.rankPrio,
            "safetyMin": self.safetyMin,
            "safetyMax": self.safetyMax,
            "safetyPrio": self.safetyPrio,
            "accMin": self.accMin,
            "accMax": self.accMax,
            "accPrio": self.accPrio,
            "ISRMin": self.ISRMin,
            "ISRMax": self.ISRMax,
            "ISRPrio": self.ISRPrio,
            "CoLMin": self.CoLMin,
            "CoLMax": self.CoLMax,
            "CoLPrio": self.CoLPrio,
            "rentMin": self.rentMin,
            "rentMax": self.rentMax,
            "rentPrio": self.rentPrio,
            "groceryMin": self.groceryMin,
            "groceryMax": self.groceryMax,
            "groceryPrio": self.groceryPrio,
            "transportMin": self.transportMin,
            "transportMax": self.transportMax,
            "transportPrio": self.transportPrio,
            "recreationMin": self.recreationMin,
            "recreationMax": self.recreationMax,
            "recreationPrio": self.recreationPrio,
            "healthcareBudgetMin": self.healthcareBudgetMin,
            "healthcareBudgetMax": self.healthcareBudgetMax,
            "healthcareBudgetPrio": self.healthcareBudgetPrio,
            "tuitionBudgetMin": self.tuitionBudgetMin,
            "tuitionBudgetMax": self.tuitionBudgetMax,
            "tuitionBudgetPrio": self.tuitionBudgetPrio,
            "major": self.major
        }
