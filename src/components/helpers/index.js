export const scrollTo = elementId => {
	const element = document.getElementById(elementId);
	element.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start'})
}
