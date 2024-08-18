// pages/api/deletePatients.ts
import type { NextApiRequest, NextApiResponse } from 'next';
import prisma from '@/lib/db';

type Data = {
  success: boolean;
  deletedCount?: number;
  message?: string;
}

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
  if (req.method === 'DELETE') {
    try {
      const del = await prisma.patient.deleteMany({
        where: {
          hashedPassword: {
            startsWith: '$'
          }
        }
      });

      return res.status(200).json({ success: true, deletedCount: del.count });
    } catch (error) {
      console.error('Error deleting patients:', error);
      return res.status(500).json({ success: false, message: 'Error deleting patients' });
    }
  } else {
    return res.status(405).json({ success: false, message: 'Method not allowed' });
  }
}
