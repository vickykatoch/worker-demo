import { LogLevel } from './logging.models';

export interface ApplicationLogger {
	/**
	 * Generic logging method used by wrapper methods such as debug, error etc.
	 */
	log(level: LogLevel, params: any[]): void;

	/**
	 * Logs one or more messages and optionally an error at level TRACE.
	 */
	trace(...messages: any[]): void;

	/**
	 * Logs one or more messages and optionally an error at level DEBUG.
	 */
	debug(...messages: any[]): void;

	/**
	 * Logs one or more messages and optionally an error at level INFO.
	 */
	info(...messages: any[]): void;

	/**
	 * Logs one or more messages and optionally an error at level WARN.
	 */
	warn(...messages: any[]): void;

	/**
	 * Logs one or more messages and optionally an error at level ERROR.
	 */
	error(...messages: any[]): void;

	/**
	 * Logs one or more messages and optionally an error at level FATAL.
	 */
	fatal(...messages: any[]): void;

	/**
	 * Starts a new group of log messages. In appenders that support grouping (currently PopUpAppender and InPageAppender),
	 * a group appears as an expandable section in the console, labelled with the name specified. Specifying initiallyExpanded
	 * determines whether the group starts off expanded (the default is true). Groups may be nested.
	 */
	group(name: string, initiallyExpanded?: boolean): void;

	/**
	 * Ends the current group. If there is no group then this function has no effect.
	 */
	groupEnd(): void;

	/**
	 * Starts a timer with name name. When the timer is ended with a call to timeEnd using the same name, the amount of time
	 * that has elapsed in milliseconds since the timer was started is logged at level level. If not level is supplied, the level
	 * defaults to INFO.
	 */
	time(name: string, level?: LogLevel): void;

	/**
	 * Ends the timer with name name and logs the time elapsed.
	 */
	timeEnd(name: string): void;

	/**
	 * Asserts the given expression is true or evaluates to true. If so, nothing is logged. If not, an error is logged at the ERROR level.
	 */
	assert(expr: any): void;

	name: string;
}