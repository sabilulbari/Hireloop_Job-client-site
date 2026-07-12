import { requireRoll } from "@/lib/core/session";

const layout = async ({children}) => {
        await requireRoll('recruiter')
        return children;

};

export default layout;