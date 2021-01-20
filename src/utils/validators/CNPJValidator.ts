import Validator from "../Validator";

export default class CNPJValidator extends Validator {
  validate(cnpj?: string){
      if(!cnpj) return this.empty
 
      cnpj = cnpj.replace(/[^\d]+/g,'');
   
      if(cnpj == '') return this.invalid;
       
      if (cnpj.length != 14)
          return this.invalid;
   
      // Elimina CNPJs invalidos conhecidos
      if (cnpj == "00000000000000" || 
          cnpj == "11111111111111" || 
          cnpj == "22222222222222" || 
          cnpj == "33333333333333" || 
          cnpj == "44444444444444" || 
          cnpj == "55555555555555" || 
          cnpj == "66666666666666" || 
          cnpj == "77777777777777" || 
          cnpj == "88888888888888" || 
          cnpj == "99999999999999")
          return this.invalid;
           
      // Valida DVs
      let length = cnpj.length - 2
      let numbers = cnpj.substring(0, length);
      let digits = cnpj.substring(length);
      let sum = 0;
      let pos = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += Number(numbers.charAt(length - i)) * pos--;
        if (pos < 2)
              pos = 9;
      }
      let resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (resultado != Number(digits.charAt(0)))
          return this.invalid;
           
      length = length + 1;
      numbers = cnpj.substring(0,length);
      sum = 0;
      pos = length - 7;
      for (let i = length; i >= 1; i--) {
        sum += Number(numbers.charAt(length - i)) * pos--;
        if (pos < 2)
              pos = 9;
      }
      resultado = sum % 11 < 2 ? 0 : 11 - sum % 11;
      if (resultado != Number(digits.charAt(1)))
            return this.invalid;
             
      return null;
      
  }
}