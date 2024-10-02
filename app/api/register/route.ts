import User from '@/models/User';
import connectMongoDB from '@/utils/db';
import bcrypt from 'bcrypt';
import { NextRequest, NextResponse } from 'next/server';

// Named export for the POST method
export async function POST(req: NextRequest) {
  try {
    const { email, password, role } = await req.json();

    await connectMongoDB();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({ message: 'User already exists' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ email, password: hashedPassword, role });

    await user.save();
    return NextResponse.json({ message: 'User registered successfully' }, { status: 201 });
  } catch (error) {
    console.error('Error during registration:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}

