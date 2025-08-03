export function getLinkedinAuthURL() {
    const LINKEDIN_CLIENT_ID = process.env.NEXT_PUBLIC_LINKEDIN_CLIENT_ID;
    const REDIRECT_URI = process.env.NEXT_PUBLIC_LINKEDIN_REDIRECT_URI;
    const LINKEDIN_AUTH_SCOPE = process.env.NEXT_PUBLIC_LINKEDIN_AUTH_SCOPE;

    return `https://www.linkedin.com/oauth/v2/authorization?response_type=code&client_id=${LINKEDIN_CLIENT_ID}&redirect_uri=${REDIRECT_URI}&scope=${LINKEDIN_AUTH_SCOPE}`;
}
