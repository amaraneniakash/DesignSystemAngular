import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {
  myForm: FormGroup;
  @Input() checkboxData = ['Aerohive', 'AvePoint', 'BEA System', 'Barracuda', 'BitTitan', 'Cirius', 'Cisco', 'Commvault'];
  searchedcheckbox = [];
  checkboxItemsStatus = [];
  numberOfcheckboxItemsToBeShown = 2;
  @Input() itemLimit = 2;
  @Input() title = 'Title';
  @Input() searchText = 'Search';
  @Output() checkboxStateChanged = new EventEmitter();

  constructor(private fb: FormBuilder) {
    this.viewAllItems();
  }

  onCheckboxChange(e, indexData) {
    const checkArray: FormArray = this.myForm.get('selectedCheckBox') as FormArray;

    if (e.target.checked) {
      checkArray.push(new FormControl(e.target.value));
    } else {
      let i = 0;
      checkArray.controls.forEach((item: FormControl) => {
        if (item.value === e.target.value) {
          checkArray.removeAt(i);
          return;
        }
        i++;
      });
    }
    this.checkboxItemsStatus = this.myForm.value.selectedCheckBox;
    this.checkboxStateChanged.emit(indexData);
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      search: [''],
      selectedCheckBox: this.fb.array([])
    });

    this.valueChangeItems();

    this.searchedcheckbox = this.checkboxData;
    this.viewLimitedItems();
  }

  filterItems(arr, query) {
    return arr.filter((el) => {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
    });
  }

  viewAllItems() {
    this.numberOfcheckboxItemsToBeShown = this.searchedcheckbox.length;
  }

  viewLimitedItems() {
    this.numberOfcheckboxItemsToBeShown = this.itemLimit;
  }

  valueChangeItems() {
    this.myForm.controls.search.valueChanges.subscribe(val => {
      this.searchedcheckbox = this.filterItems(this.checkboxData, val);
      this.viewLimitedItems();
    });
  }

}
