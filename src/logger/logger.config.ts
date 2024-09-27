export interface ILoggerConfig {
  logLevel: string;
  logDir: string;
  logFileName: string;
  logRotateInterval?: string;
  logRotationMaxSize?: string;
  logRotationCompress?: string;
}
