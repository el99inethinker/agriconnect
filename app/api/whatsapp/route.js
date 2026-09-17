export async function POST(request){
  const formData=await request.formData();
  const incomingMessages=formData.get('Body');
  const fromNumber=formData.get('From');
  const claudeResponse=await fetch('https://api.anthropic.com/v1/messages',{
    method: 'POST',
    headers:{
      'x-api-key':process.env.ANTHROPIC_API_KEY,
      'anthropic-version':'2023-06-01',
      'content-type':'application/json',
    },
    body:JSON.stringify({
      model:'claude-sonnet-4-6',
      max_tokens: 500,
      messages:[
        {
          role:'user',
          content:`You are an assistant helping Nigerian farmers connect with buyers on AgriConnect. A farmer sent this WhatsApp message:"${incomingMessage}". Reply helpfully and briefly. `,
        },
        ],
    })
  });
  const data=await claudeResponse.json();
  const replyText=data.content?.[0]?.text||"sorry, I couldn't process that. Please try again.";
  const twiml=`<?xml version="1.0" encoding="UTF-8"?>
  <Response>
  <Message>${replyText}</Message>
  </Response>`;
  return new Response(twiml,{
    headers:'Content-Type':'text/xml'},
                      });
}
    
