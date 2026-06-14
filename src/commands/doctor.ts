import type { Output } from "../core/output.js";
import { t, type Language } from "../i18n/index.js";
import type { GitService } from "../services/git.js";
import type { GitHubCliService } from "../services/github-cli.js";

export interface DoctorSummary {
  ok: boolean;
}

export async function runDoctor(
  git: GitService,
  gh: GitHubCliService,
  output: Output,
  language: Language,
): Promise<DoctorSummary> {
  output.info(t(language, "doctor.title"));

  const gitInstalled = await git.isInstalled();
  output.status(gitInstalled ? "ok" : "fail", t(language, "doctor.gitInstalled"));
  if (!gitInstalled) {
    output.info(t(language, "doctor.installGit"));
    return { ok: false };
  }

  const ghInstalled = await gh.isInstalled();
  output.status(ghInstalled ? "ok" : "fail", t(language, "doctor.ghInstalled"));
  if (!ghInstalled) {
    output.info(t(language, "doctor.installGh"));
    return { ok: false };
  }

  const ghAuthenticated = await gh.isAuthenticated();
  output.status(ghAuthenticated ? "ok" : "fail", t(language, "doctor.ghAuthenticated"));
  if (!ghAuthenticated) {
    output.info(t(language, "doctor.loginGh"));
  }

  const gitRepo = await git.isRepository();
  output.status(gitRepo ? "ok" : "fail", t(language, "doctor.gitRepo"));

  const remoteConnected = gitRepo ? await git.hasRemote() : false;
  output.status(remoteConnected ? "ok" : "fail", t(language, "doctor.remoteConnected"));

  const clean = gitRepo ? !(await git.hasChanges()) : false;
  output.status(clean ? "ok" : "warn", t(language, "doctor.workingTreeClean"));

  const lastCommit = gitRepo ? await git.lastCommit() : undefined;
  output.status(lastCommit ? "ok" : "warn", t(language, "doctor.lastBackup"), lastCommit);

  return { ok: gitInstalled && ghInstalled && ghAuthenticated && gitRepo && remoteConnected };
}
