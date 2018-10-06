var deviceTemplate = {  
    "heatpumpWaterHeaterGen4":  [
   {
      "type":"DynamicControl_number",
      "displayName":"Set Point",
      "objectName":"WHTRSETP",
      "warnAt":120,
      "warningMessage":"CAUTION:  Water is very hot.  Contact with skin may cause serious burns.",
      "unit":"\u00B0 F"
   },
   {  
      "type":"dynamicControl_switch",
      "displayName":"SHUTOFF:",
      "objectName":"whtrsetp"     
   }
   ]
};