import httpx
from fastapi import APIRouter, HTTPException

router=APIRouter(prefix="/external",tags=["external"])

@router.get("/users")
async def external_users():
    try:
        async with httpx.AsyncClient(timeout=5.0) as client:
            r=await client.get("https://jsonplaceholder.typicode.com/users")
            r.raise_for_status()
            data=r.json()
            return [{"id":x["id"],"name":x["name"],"email":x["email"]} for x in data]
    except httpx.TimeoutException:
        raise HTTPException(504,"External API timed out")
    except httpx.HTTPError:
        raise HTTPException(502,"External API unavailable")
