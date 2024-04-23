// import { Component, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
// import { createRoot } from 'react-dom/client';
// import DataTable from '../../react-components/DataTable'; // Correct path to your React component

// @Component({
//   selector: 'app-react-wrapper',
//   template: '<div #reactContainer></div>',
// })
// export class ReactWrapperComponent implements AfterViewInit {
//   @ViewChild('reactContainer', { static: true })
//   reactContainer!: ElementRef<HTMLDivElement>;

//   constructor() {}

//   ngAfterViewInit(): void {
//     const data = [
//       { id: 1, name: 'John Doe', age: 28, location: 'New York' },
//       { id: 2, name: 'Jane Smith', age: 34, location: 'London' },
//       { id: 3, name: 'Mike Johnson', age: 45, location: 'Sydney' },
//     ]; // Sample data

//     const root = createRoot(this.reactContainer.nativeElement);
//     root.render(<DataTable data={data} />);
//   }
// }