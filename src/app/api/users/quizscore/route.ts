import { NextRequest, NextResponse } from 'next/server';
import { connect } from '@/dbConfig/dbConfig';
import { getDataFromToken } from '@/helpers/getDataFromToken';
import User from '@/models/userModel';

connect();

type QuizField = 'html' | 'css' | 'js';

export async function POST(request: NextRequest) {
  try {
    const userId = await getDataFromToken(request);
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const field = body?.field as QuizField;
    const score = Number(body?.score);

    if (!['html', 'css', 'js'].includes(field)) {
      return NextResponse.json({ error: 'Invalid field' }, { status: 400 });
    }

    if (!Number.isFinite(score) || score < 0) {
      return NextResponse.json({ error: 'Invalid score' }, { status: 400 });
    }

    const updatePath = `quizScores.${field}`;

    await User.findByIdAndUpdate(userId, {
      $set: {
        [updatePath]: score,
      },
    });

    return NextResponse.json({ message: 'Quiz score saved' }, { status: 200 });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Internal server error';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
