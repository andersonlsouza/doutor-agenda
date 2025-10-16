import { eq } from "drizzle-orm";
import { headers } from "next/headers";
import { redirect } from "next/navigation";

import {
  PageActions,
  PageContainer,
  PageContent,
  PageDescription,
  PageHeader,
  PageHeaderContent,
  PageTitle,
} from "@/components/ui/page-container";
import { db } from "@/db";
import { doctorsTable, patientsTable } from "@/db/schema";
import { auth } from "@/lib/auth";

import AddButtonAppointment from "./_components/add-button-appointments";

export default async function AppointmentsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect("/authentication");
  }

  if (!session.user.clinic) {
    redirect("/clinic-form");
  }

  // Buscar pacientes e médicos da clínica
  const [patients, doctors] = await Promise.all([
    db.query.patientsTable.findMany({
      where: eq(patientsTable.clinicId, session.user.clinic.id),
    }),
    db.query.doctorsTable.findMany({
      where: eq(doctorsTable.clinicId, session.user.clinic.id),
    }),
  ]);

  return (
    <PageContainer>
      <PageHeader>
        <PageHeaderContent>
          <PageTitle>Agendamentos</PageTitle>
          <PageDescription>
            Gerencie os agendamentos da sua clínica
          </PageDescription>
        </PageHeaderContent>
        <PageActions>
          <AddButtonAppointment doctors={doctors} patients={patients} />
        </PageActions>
      </PageHeader>
      <PageContent>
        {/* Listagem de agendamentos será implementada futuramente */}
        <div className="border-muted-foreground/25 flex h-64 items-center justify-center rounded-lg border-2 border-dashed">
          <p className="text-muted-foreground">
            Lista de agendamentos será implementada em breve
          </p>
        </div>
      </PageContent>
    </PageContainer>
  );
}
