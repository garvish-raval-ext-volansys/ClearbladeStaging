var productAutPollConfiguration = {  
    "heatpumpWaterHeaterGen4":  { "config":"auto-poll","parameters":
        { "frequency":10, "objects":["WHTRENAB", "WHTRCNFG", "WHTRSETP", "VACA_NET", "HEATCTRL", "FAN_CTRL", "COMP_RLY"],
         "transactionId":6501 }
    },
    "tritonWaterHeater":  { "config":"auto-poll","parameters":
        { "frequency":30, "objects":["PRODSERN", "HEATCALL", "TANKTEMP", "FLUETEMP", "INLTTEMP", "VLVSTATE", "FLAMECUR", 
                                      "FANSPEED", "BLOWRPWM", "S1_AIRFL", "S2_INPRS", "S3_EXPRS", "S4_GLINE", "AUXFSENS", 
                                      "SHUT1REQ", "MODEL_ID", "SHUTOPEN", "SHUTCLOS", "LEAKSENR", "CHE_SIGN", "CHE_FIGN",
                                      "CHEFFAIL", "CHE_HIOP", "CHE_BMIN", "GASVALVE", "SW_VERSN", "ALARMS", "ALERTS",
                                      "AND1POWR", "AND2POWR", "AND3POWR", "ANODSTAT", "AND1STAT", "AND2STAT", "AND3STAT"],
         "transactionId":6501 }
    },
    "heatpumpWaterHeaterGen1":  { "frequency":5, "objects":["a1","a2","a3"]},
    "gasWaterHeater":           { "frequency":5, "objects":["bO1","bO2","bO3"]},
    "hotspringWaterHeater":     { "frequency":5, "objects":["bO1","bO2","bO3"]},
    "econetWiFiTranslator":     { "frequency":5, "objects":["dO1","dO2","dO3"]},
    "econetControlCenter":     { 
        "config":"auto-poll","parameters": [
        {
        "frequency": 0,
          "objects":  [
        "PRODMODN",
        "PRODSERN",
        "SW_VERSN",
        "DISPUNIT",
        "HEATSETP",
        "COOLSETP",
        "DEADBAND",
        "STATMODE",
        "STAT_FAN",
        "STATNFAN",
        "DHUMENAB",
        "DHUMSETP",
        "DHUM_OCL",
        "DH_DRAIN",
        "HUMDCNFG",
        "HUMDCTRL",
        "HUMDSETP",
        "HUMSMART",
        "AUTOTIME",
        "SMARTREC",
        "TEMPOFFS",
        "ALRMBEEP",
        "SCRNLOCK",
        "OAT_TEMP",
        "SPT",
        "RELH7005",
        "HVACMODE",
        "SCHEDULE",
        "SCHEDOVR",
        "SCHEDULS",
        "SCHEDOVC",
        "SCHEDOVH",
        "SCHEDOVF",
        "VACAENAB",
        "VACA_FAN",
        "COOLVACA",
        "HEATVACA",
        "VACASTIM",
        "VACAETIM",
        "VACASDAY",
        "VACAEDAY",
        "VACASMON",
        "VACAEMON",
        "VACASYOC",
        "VACAEYOC",
        "VACSTATE"
      ]
        },
        {
          "frequency": 131,
          "objects": [
            "HEATSETP",
            "COOLSETP",
            "STATMODE",
            "STAT_FAN",
            "STATNFAN",
            "VACSTATE",
            "HVACMODE"
          ]
        },
        {
          "frequency": 499,
          "objects": [
            "TEMPOFFS",
            "DEADBAND",
            "DISPUNIT"
          ]
        },
        {
          "frequency": 593,
          "objects": [
            "DHUMENAB",
            "DHUMSETP",
            "DHUM_OCL",
            "DH_DRAIN",
            "HUMDCNFG",
            "HUMDCTRL",
            "HUMDSETP",
            "HUMSMART",
            "AUTOTIME",
            "SMARTREC",
            "ALRMBEEP",
            "SCRNLOCK"
          ]
        },
        {
          "frequency": 127,
          "objects": [
            "SCHEDULE",
            "SCHEDOVR",
            "SCHEDULS",
            "SCHEDOVC",
            "SCHEDOVH",
            "SCHEDOVF"
          ]
        },
        {
          "frequency": 239,
          "objects": [
            "VACAENAB",
            "VACA_FAN",
            "COOLVACA",
            "HEATVACA"
          ]
        },
        {
          "frequency": 607,
          "objects": [
            "VACASTIM",
            "VACAETIM",
            "VACASDAY",
            "VACAEDAY",
            "VACASMON",
            "VACAEMON",
            "VACASYOC",
            "VACAEYOC"
          ]
        },
        {
          "frequency": 137,
          "objects": [
            "OAT_TEMP",
            "SPT",
            "RELH7005"
          ]
        }
      ],
        "triggers" : {
            "HEATSETP" : [  "COOLSETP", "SCHEDOVH"],
            "COOLSETP" : [  "HEATSETP", "SCHEDOVC"],
            "STATNFAN" : [  "SCHEDOVF"],
            "SCHEDOVH" : [  "HEATSETP", "COOLSETP"],
            "SCHEDOVC" : [  "HEATSETP", "COOLSETP"],
            "SCHEDOVF" : [  "HEATSETP", "COOLSETP"],
            "DISPUNIT" : [  "COOLSETP", "HEATSETP"],
            "SCHEDULS" : [  "COOLSETP", "HEATSETP"],
            "SCHEDULE" : [  "COOLSETP", "HEATSETP", "STAT_FAN", "STATNFAN"], 
            "VACAENAB" : [  "VACSTATE"]
        }
      }
};