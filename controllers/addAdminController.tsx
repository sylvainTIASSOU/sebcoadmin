class AddAdminController {
  constructor() {};

  static async postFunction(data: any, endPoint: string) {
    const response = await fetch(`http://localhost:3001/${endPoint}`, {
            
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
          });
    return response ;
  }

  static async fetchDataByPseudo(pseudo: string) {
    const url = `http://localhost:3001/admin/singleId/${pseudo}`;
    try {
      const res = await fetch(url, {
        method: 'GET',
        headers: {
          'Content-Type': "application/json",
        }
      });
      if(!res.ok) {
        throw new Error("la reponse du réseau n'est pas OK");
      }

      const data = await res.json();
      return data;
    } catch(errors) {
      console.log(`erreur de recuperation de donné ${errors}`);
      throw errors;
    }
  }
  
}