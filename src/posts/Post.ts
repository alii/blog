export abstract class Post {
	public abstract readonly name: string;
	public abstract readonly date: Date | string;
	public abstract readonly slug: string;
	public abstract readonly excerpt: string;
	abstract render(): JSX.Element;
}
