-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "Dog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "breed" TEXT NOT NULL,
    "sex" TEXT NOT NULL,
    "training_start" DATETIME NOT NULL,
    "birthday" DATETIME,
    "last_heat" DATETIME
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "trainer_id" TEXT NOT NULL,
    "dog_id" TEXT NOT NULL,
    "sample_set_id" TEXT NOT NULL,
    "eeg_file_path" TEXT,
    "video_file_path" TEXT,
    "notes" TEXT,
    "last_meal" INTEGER NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME,
    "mode" TEXT NOT NULL DEFAULT 'training',
    CONSTRAINT "Session_trainer_id_fkey" FOREIGN KEY ("trainer_id") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_dog_id_fkey" FOREIGN KEY ("dog_id") REFERENCES "Dog" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "Session_sample_set_id_fkey" FOREIGN KEY ("sample_set_id") REFERENCES "SampleSet" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SampleSet" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "date" TEXT NOT NULL,
    "sample_ehr_uids" TEXT NOT NULL,
    "date_time" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Run" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "session_id" TEXT NOT NULL,
    "positive_stations" TEXT NOT NULL,
    "start_time" DATETIME NOT NULL,
    "end_time" DATETIME,
    CONSTRAINT "Run_session_id_fkey" FOREIGN KEY ("session_id") REFERENCES "Session" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Sniff" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "run_id" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "is_positive_indication" BOOLEAN NOT NULL,
    "result" TEXT NOT NULL,
    "time" DATETIME NOT NULL,
    CONSTRAINT "Sniff_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "Run" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SampleBattery" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "run_id" TEXT NOT NULL,
    "station" TEXT NOT NULL,
    "sample_ehr_uid" TEXT NOT NULL,
    CONSTRAINT "SampleBattery_run_id_fkey" FOREIGN KEY ("run_id") REFERENCES "Run" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Dog_name_key" ON "Dog"("name");

-- CreateIndex
CREATE UNIQUE INDEX "SampleSet_date_key" ON "SampleSet"("date");

-- CreateIndex
CREATE UNIQUE INDEX "SampleBattery_run_id_station_key" ON "SampleBattery"("run_id", "station");
