export default function validationsInputsErrors(formData: FormData) {
  const validationErrors: string[] = [];

  const age = Number(formData.get("age") ?? NaN);
  if (isNaN(age)) validationErrors.push("Edad es requerida.");
  else if (age < 10 || age > 100)
    validationErrors.push("Edad debe estar entre 10 y 100 años.");

  const weight = Number(formData.get("weight") ?? NaN);
  if (isNaN(weight)) validationErrors.push("Peso es requerido.");
  else if (weight < 30 || weight > 300)
    validationErrors.push("Peso debe estar entre 30 y 300 kg.");

  const height = Number(formData.get("height") ?? NaN);
  if (isNaN(height)) validationErrors.push("Altura es requerida.");
  else if (height < 100 || height > 250)
    validationErrors.push("Altura debe estar entre 100 y 250 cm.");

  const frequency = Number(formData.get("frequency") ?? NaN);
  if (isNaN(frequency)) validationErrors.push("Frecuencia es requerida.");
  else if (frequency < 0 || frequency > 14)
    validationErrors.push("Días/Semana debe estar entre 0 y 14.");

  const duration = Number(formData.get("duration") ?? NaN);
  if (isNaN(duration)) validationErrors.push("Duración es requerida.");
  else if (duration < 5 || duration > 600)
    validationErrors.push("Minutos/Sesión debe estar entre 5 y 600.");

  const gender = formData.get("gender");
  if (!gender) validationErrors.push("Género es requerido.");

  const activityLevel = formData.get("activityLevel");
  if (!activityLevel) validationErrors.push("Nivel de actividad es requerido.");

  const goal = formData.get("goal");
  if (!goal) validationErrors.push("Objetivo principal es requerido.");

  const experienceLevel = formData.get("experienceLevel");
  if (!experienceLevel)
    validationErrors.push("Nivel de experiencia es requerido.");

  return validationErrors;
}
