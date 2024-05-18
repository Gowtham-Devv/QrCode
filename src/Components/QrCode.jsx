import React, { useState } from 'react';
import "../Style/QrCode.css";

function QrCode() {
    const [img, setImg] = useState("");
    const [loading,setLoading] = useState(false);
   const [qrData,setQrData] = useState("")
   const [qrSize,setQrSize] = useState("")
   async function generateQR() {
       setLoading(true);
       try{
              const url =`https://api.qrserver.com/v1/create-qr-code/?size=${qrSize}*${qrSize}&data=${encodeURIComponent(qrData)}`;
              setImg(url);
       }catch(error){
       console.error("Error generating Qr Code",error)
       }finally{
        setLoading(false)
       }
    }
    function downLoad(){
fetch(img)
.then((res)=>res.blob())
.then((blob) =>{
     const link =document.createElement("a");
     link.href=URL.createObjectURL(blob);
     link.download="qrcode.png";
     document.body.appendChild(link);
     link.click();
     document.body.removeChild(link);
}).catch((error)=>{
    console.error("Error Downloading Qr Code",error);
})
    }

    return (
        <main id='QrCode'>
            <div className='container-fluid'>
                <div className='container'>
                    <div className='Card'>
                        <div className='Title text-center pb-5'>
                            <h1>Qr Code Generator</h1>
                           {loading &&  <p> Please Wait...</p>}
                        </div>
                        <div className='d-flex justify-content-center mb-3'>
                            {img && <img src={img} alt="QR Code" className='qrCodeImg' />}
                        </div>
                        <div className=' d-flex  flex-column align-items-center'>
                        <div className='Item1 mb-4'>
                            <label htmlFor="dataInput" className='inputLable'>Data for Qr Code </label>
                            <input type="text" id='dataInput' placeholder='Enter data for Qr Code'value={qrData} onChange={(e) => setQrData(e.target.value)} />
                        </div>
                        <div className='Item2 mb-5'>
                            <label htmlFor="SizeInput" className='inputLable'> Image Size (e.g., 150) </label>
                            <input type="text" id='SizeInput' placeholder='Enter Image Size' value={qrSize} onChange={(e)=>setQrSize(e.target.value)}/>
                        </div>
                        </div>
                        <div className='btnDiv d-flex justify-content-center gap-5  mb-5'>
                            <button className='generateBtn' disabled={loading} onClick={generateQR}>Generate Qr Code</button>
                            <button className='downlodeBtn' onClick={downLoad}>Download Qr Code</button>
                        </div>
                        <div className='text-center mt-5 footer'> <h3>Designed By Gowtham</h3>  </div>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default QrCode;
