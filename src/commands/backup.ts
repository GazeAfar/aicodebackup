import { AICodeBackupError } from "../core/errors.js";
import type { Output } from "../core/output.js";
import { nextStep } from "../core/output.js";
import { t, type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";

export interface BackupResult {
  backedUp: boolean;
  commitMessage?: string;
}

export async function runBackup(
  git: GitService,
  output: Output,
  language: Language,
  timestamp = new Date(),
): Promise<BackupResult> {
  if (!(await git.isRepository())) {
    throw new AICodeBackupError(
      t(language, "backup.requireGitRepo"),
      nextStep(language, "backup.nextSetup"),
    );
  }

  if (!(await git.hasRemote())) {
    throw new AICodeBackupError(
      t(language, "backup.requireRemote"),
      nextStep(language, "backup.nextSetup"),
    );
  }

  if (!(await git.hasChanges())) {
    output.info(t(language, "backup.noChanges"));
    return { backedUp: false };
  }

  const commitMessage = t(language, "backup.commitMessage", {
    timestamp: formatTimestamp(timestamp),
  });

  await git.addAll();
  await git.commit(commitMessage);
  await git.push();

  output.success(t(language, "backup.success"));
  return { backedUp: true, commitMessage };
}

function formatTimestamp(date: Date): string {
  const pad = (value: number) => String(value).padStart(2, "0");
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())} ${pad(
    date.getHours(),
  )}:${pad(date.getMinutes())}:${pad(date.getSeconds())}`;
}
