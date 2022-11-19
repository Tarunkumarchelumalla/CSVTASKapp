

var ab=[("")];
let csvinfo="name,city,gender,email\n"

let userdata="";
const options = {
	method: 'GET',
	// headers: {

	// }
};
  var get=document.getElementById("get")
  get.addEventListener("click", function(){
  getusercsv();
  });

  const api_url = 
  "https://random-data-api.com/api/v2/users?size=5";


  async function getapi(url) {
   
    const response = await fetch(url,options);
    

    var data = await response.json();
 
  
    console.log(data);
  
    return data;
   
}
 

        function convertcsv(blob,filename){
          if(window.navigator.msSaveOrOpenBlob){
            window.navigator.msSaveOrOpenBlob(blob,filename);
          }
          else{
            const url=window.URL.createObjectURL(blob);
            const a =document.createElement('a');
            document.body.appendChild(a);
            a.href=url;
            a.download=filename;
            a.click();
            csvinfo="name,city,gender,email\n"
          }
    }

   
    async function  getusercsv(){

 const ab=await getapi(api_url);
//  console.log(ab)


    ab.map(as=>{
                    
                 
      let row =as.first_name+","+as.address.city+","+as.gender+","+as.email+"\n"
      csvinfo+=row;
   
      });
      var data= new Blob([csvinfo],{type:"text/csv"});
      convertcsv(data,"users.csv")
  }

        var getsort=document.getElementById("sort")
        getsort.addEventListener("click", function(){
        Papa.parse(document.getElementById("uploadfile").files[0],{
        download:true,
        header:true,
        skipEmptyLines:true,
        complete:function(result){
          const ag=result.data.sort(GetSortOrder("name")); 

    ag.map(as=>{
                  
                 
      let row1 =as.name+","+as.city+","+as.gender+","+as.email+"\n"
      csvinfo+=row1;
   
      });
      var data1= new Blob([csvinfo],{type:"text/csv"});
      convertcsv(data1,"users-sorted.csv")
    console.log(ag);
  }
 })
  });
// comparter function
  function GetSortOrder(prop) {    
    return function(a, b) {    
        if (a[prop] > b[prop]) {    
            return 1;    
        } else if (a[prop] < b[prop]) {    
            return -1;    
        }    
        return 0;    
    }    
}   


 

var feh=document.getElementById("fetch")


feh.addEventListener("click", function(){
Papa.parse(document.getElementById("uploadfile1").files[0],{
download:true,
header:true,
skipEmptyLines:true,
complete:function(result){

var username=document.getElementById("userdata").value;
  if(username){
userdata=result.data;
userdata.filter((data)=>data.name === username).map((curr)=>{
  console.log(curr);

const h=JSON.stringify(curr)
  document.getElementById("uta").innerHTML=h;
  
})
}
else{
  alert("enter name field")
}
}
})
});

