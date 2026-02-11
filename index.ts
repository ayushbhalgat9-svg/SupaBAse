import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

serve(async () => {
  try {
    const clientEmail = Deno.env.get("sheets-service@project-588c4269-14a9-4786-a19.iam.gserviceaccount.com")!;
    const privateKey = Deno.env.get("-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDVxZ7ZSCvP/5NO\niXxF34aUYwvNkMu2YwX94iQOM5EFAwrCQFjZdcNYwyCURG1R1hBp6GWcNLL3xih3\nppDFNgUx/cUJYBr82jyWJyr7qZSo28gl3C0BoFQtpX6y5pOpcSG0r8HIfWgnFydD\nmDEmqtdiFLps/pmTfZGf1JTslTqn8QlBjOlG6Y8J5dgiNuSsjthjPuXt77wXXV/v\nh6a+YsEmv8I2ts5q3uGLhKRXZV+5FHZ5ZcSIBIhvoP/GoaXNt6EHZobRY5y6eMsY\nMVFMgNadvyUWUzAT4pEVHO1PDAtD0a2Lfbqk461bsIbidgXNp/+KHCodxSt4nZny\nU9LEa7d3AgMBAAECggEAQVTlKCibYzULkvwHo98dZSokCE4RRAtdYGsFc+Wkk3CL\nkDRUMxl/exgfU9DZzCHs4EErFKMycvD3myGnqu3Ihq+00RmzBcW4sHcF9uWrzjNl\nJtT0WEPklhK29vvq8uTlVTBFu/0/oHq+ADV6CAQ8UPhexULGMsI0iDFS1j8BLyO3\nFXj5O+JPVqR5AsGgAinsCjQWJSjzmr1V9ug4JWh7Zvnp1yzHCrs5DburYLQD1Mtc\nB7K3oLR9PXTznxeT0VDnF4+pFFRNVOvdoiYERr881SUNAroAVZlVSMeQKVvHUEES\ng1LGOK5kpk23pN673foKFqxMtkXJvOl1rBUL5sCIwQKBgQDvpF/t3U1+sNY1pb+L\n1R9JBaaFTgnt018ozIIqnP1Ue1jjsXIqLDBc7OBHVbfSntty33tEt0JDZ6Vns0m9\nneJax5t0BHvc2YDimp2mc+DenrfBcyLIPYbLb0A8VK2g+znqZrY5QQA6kZotd0Jd\nhD1zqwvuqReA59/N/krRQvB/oQKBgQDkXS2ctCTphLZSfzF8jj//YXqrOhRLgJp/\nhyYqmixLM6k4XEHdf9NRkjJJjGPif3MR2hHFxpvf9L6F8CdJlT6tjkzZJ/flmBK6\nuEyipL0De1sOASU/Iitr2AgCKrjMD7XaUv5RdDCUj9mp3t6F/CqMecp3UR0r8XgQ\n+qJOl+hAFwKBgAeqCidhXIkgvrkYg/fE6Ss8swawaEDi8bgsUj1qp+97wmwF0NDo\neON/7+xYIXjq+7nAzAB2m/fr6K5YXZNi6Upd9+rN+egmTKjyqPgZ3KdCDD5zoDkn\nPphjBnrnemYbos6MWmeaXJeC8JtjpQu4nv6ECe2oGshUoiPEbkAjE+4BAoGAcPNB\nXzOe2j2A7FbrBB9buhXd1ZkZdqq6P/95ujKdW+jGdxDypvrVa5Ay/TvKH7pIEPla\nNwdgC6qDHb5FwFhoMvGiQvpI26+W+/GyPfPbZUB7LfcVFB/zeBjXBTNaSdwvZzgL\ngABHEwP/dcy9JWovJWIL6W4eTqDVcRh2dQcfoasCgYEAxLWgO5FVIqOUHTH4+2c1\nSqujyDqYFHhNT2U9GHEl17rKgsgYs/sdm6Pfvq6sMPU3tF2BoJFuZNMhjkW8Zv0z\njO+HRkk8Dgv13x4/SBN95jI7E0nr4I1wTRj4+dCOTChcKk2+53YZzJdO31Qx64DL\ntykThuWsDO1joOsHlIZ3CN4=\n-----END PRIVATE KEY-----\n")!;
    const sheetId = Deno.env.get("1WjT_tzEuNkOZrdspAIla7q0nogmJCqY2kYL76DduRA0")!;

    if (!clientEmail || !privateKey || !sheetId) {
      return new Response(
        JSON.stringify({ error: "Missing environment variables" }),
        { status: 500 }
      );
    }

    const now = Math.floor(Date.now() / 1000);

    const header = {
      alg: "RS256",
      typ: "JWT",
    };

    const payload = {
      iss: clientEmail,
      scope: "https://www.googleapis.com/auth/spreadsheets",
      aud: "https://oauth2.googleapis.com/token",
      exp: now + 3600,
      iat: now,
    };

    function base64url(obj: object) {
      return btoa(JSON.stringify(obj))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");
    }

    const encoder = new TextEncoder();
    const jwtUnsigned = base64url(header) + "." + base64url(payload);

    const key = await crypto.subtle.importKey(
      "pkcs8",
      pemToArrayBuffer(privateKey),
      { name: "RSASSA-PKCS1-v1_5", hash: "SHA-256" },
      false,
      ["sign"]
    );

    const signature = await crypto.subtle.sign(
      "RSASSA-PKCS1-v1_5",
      key,
      encoder.encode(jwtUnsigned)
    );

    const jwt =
      jwtUnsigned +
      "." +
      btoa(String.fromCharCode(...new Uint8Array(signature)))
        .replace(/=/g, "")
        .replace(/\+/g, "-")
        .replace(/\//g, "_");

    // Exchange JWT for access token
    const tokenRes = await fetch(
      "https://oauth2.googleapis.com/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
          assertion: jwt,
        }),
      }
    );

    const tokenData = await tokenRes.json();
    const accessToken = tokenData.access_token;

    if (!accessToken) {
      return new Response(JSON.stringify(tokenData), { status: 500 });
    }

    // Write Row
    await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:append?valueInputOption=RAW`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          values: [["Hello from Supabase", new Date().toISOString()]],
        }),
      }
    );

    // Read Data
    const readRes = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/A1:B10`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }
    );

    const readData = await readRes.json();

    return new Response(JSON.stringify(readData), {
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500 }
    );
  }
});

function pemToArrayBuffer(pem: string) {
  const b64 = pem
    .replace("-----BEGIN PRIVATE KEY-----", "")
    .replace("-----END PRIVATE KEY-----", "")
    .replace(/\s/g, "");
  const binary = atob(b64);
  const buffer = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) {
    buffer[i] = binary.charCodeAt(i);
  }
  return buffer.buffer;
}
