import { requireRoll } from '@/lib/core/session';

const SeekerLayout = async ({children}) => {
    await requireRoll('seeker')
    return children;
};

export default SeekerLayout;