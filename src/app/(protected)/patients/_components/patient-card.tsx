"use client";

import { MailIcon, PhoneIcon, UserIcon } from "lucide-react";
import { useState } from "react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Dialog, DialogTrigger } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { patientsTable } from "@/db/schema";

import UpsertPatientForm from "./upsert-patient-form";

interface PatientCardProps {
  patient: typeof patientsTable.$inferSelect;
}

const PatientCard = ({ patient }: PatientCardProps) => {
  const [isUpsertPatientFormOpen, setIsUpsertPatientFormOpen] = useState(false);

  const patientInitials = patient.name
    .split(" ")
    .map((name) => name[0])
    .join("");

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-10 w-10">
            <AvatarFallback>{patientInitials}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-sm font-medium">{patient.name}</h3>
            <p className="text-muted-foreground text-sm">
              {patient.sex === "male" ? "Masculino" : "Feminino"}
            </p>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="flex flex-col gap-2">
        <Badge variant="outline">
          <MailIcon className="mr-1 h-3 w-3" />
          {patient.email}
        </Badge>
        <Badge variant="outline">
          <PhoneIcon className="mr-1 h-3 w-3" />
          {patient.phone}
        </Badge>
        <Badge variant="outline">
          <UserIcon className="mr-1 h-3 w-3" />
          {patient.sex === "male" ? "Masculino" : "Feminino"}
        </Badge>
      </CardContent>
      <Separator />
      <CardFooter>
        <Dialog
          open={isUpsertPatientFormOpen}
          onOpenChange={setIsUpsertPatientFormOpen}
        >
          <DialogTrigger asChild>
            <Button className="w-full">Ver detalhes</Button>
          </DialogTrigger>
          <UpsertPatientForm
            patient={patient}
            onSuccess={() => {
              setIsUpsertPatientFormOpen(false);
            }}
            isOpen={isUpsertPatientFormOpen}
          />
        </Dialog>
      </CardFooter>
    </Card>
  );
};

export default PatientCard;
