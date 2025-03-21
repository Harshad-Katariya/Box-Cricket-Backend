import dotenv from 'dotenv'

dotenv.config()

class cookieParser
{   
    UserCookie (request:any)
    {
        const Data: { [key: string]: string } = {};
        const rc = request.headers.cookie;

        if(rc!==undefined && rc !=="")
        {
            rc && rc.split(';').forEach(function (cookie :string) 
            {
                const parts = cookie.split('=');
                Data[parts.shift()?.trim() as string] = decodeURI(parts.join('='));
            })

            if(Data[process.env.COOKIE_USER as string] !== undefined && Data[process.env.COOKIE_USER as string] !=="")
            {
                return Data[process.env.COOKIE_USER as string];
                
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
        
        
    }

    Box_Cricket (request:any)
    {
        const Data: { [key: string]: string } = {};
        const rc = request.headers.cookie;

        if(rc!==undefined && rc !=="")
        {
            rc && rc.split(';').forEach(function (cookie :string) 
            {
                const parts = cookie.split('=');
                Data[parts.shift()?.trim() as string] = decodeURI(parts.join('='));
            })

            if(Data[process.env.BOX as string] !== undefined && Data[process.env.BOX as string] !=="")
            {
                return Data[process.env.BOX as string];
                
            }
            else
            {
                return null
            }
        }
        else
        {
            return null
        }
        
        
    }

}

export const CookieParser = new cookieParser()
