import { requireRoll } from '@/lib/core/session';
import React from 'react';

const AdminLayout = async({ children }) => {
    await requireRoll("admin") 
    return children; 
};

export default AdminLayout;