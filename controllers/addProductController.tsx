export class AddProductController {
  
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

}