import { testLeads, testSessions, testQuestions } from "@repo/db"; 
import { eq, inArray, and, desc } from "drizzle-orm";
export async function findLeadByEmail(db, email) {
  console.log("Finding lead by email:", email);

  return db.query.testLeads.findFirst({
    where: (t, { eq }) => eq(t.email, email),
  });
}

export async function createLead(db, data) {
  const [lead] = await db.insert(testLeads).values(data).returning();
  return lead;
}

export async function createTestSession(db, data) {
  const [session] = await db
    .insert(testSessions)
    .values({
      leadId: data.leadId,
      testType: data.testType || "10_min_test",
      status: data.status || "started",
      questionsSnapshot: data.questionsSnapshot || [],
      startedAt: new Date(),
    })
    .returning();

  return session;
}

export async function getSessionById(db, sessionId) {
  return db.query.testSessions.findFirst({
    where: (t, { eq }) => eq(t.id, sessionId),
  });
}

export async function getLatestSessionByLeadId(db, leadId) {
  return db.query.testSessions.findFirst({
    where: (t, { eq }) => eq(t.leadId, leadId),
    orderBy: (t, { desc }) => [desc(t.startedAt)],
  });
}

export async function getLeadById(db, leadId) {
  return db.query.testLeads.findFirst({
    where: (t, { eq }) => eq(t.id, leadId),
  });
}

export async function getRandomActiveQuestions(db, topics, maxCount = 30) {
  let conditions = eq(testQuestions.isActive, true);
  
  if (topics && topics.length > 0) {
    conditions = and(conditions, inArray(testQuestions.topic, topics));
  }

  const allMatches = await db.query.testQuestions.findMany({
    where: conditions,
  });

  const shuffled = [...allMatches].sort(() => 0.5 - Math.random());
  const selectedQuestions = shuffled.slice(0, maxCount);

  return selectedQuestions.map((q) => {
    const randomizedOptions = [...q.options].sort(() => 0.5 - Math.random());
    return {
      ...q,
      options: randomizedOptions,
    };
  });
}