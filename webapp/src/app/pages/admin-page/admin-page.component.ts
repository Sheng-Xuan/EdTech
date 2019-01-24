import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user.service';
import { TimeService } from 'src/app/services/time.service';
import { ToolService } from 'src/app/services/tool.service';
import { NzMessageService } from 'ng-zorro-antd';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.css']
})
export class AdminPageComponent implements OnInit {
  currentTable = 'users';
  users;
  tools;
  displayedUsers;
  displayedTools;
  sortName = null;
  sortValue = null;
  searchUsername = '';
  searchToolName = '';
  sortMap = {
    userId: null,
    registerTime: null,
    toolId: null,
    rateCount: null,
    avgRating: null
  };
  filterUserGroupList = [];
  filterUserStatusList = [];
  filterToolStatusList = [];
  userGroupList = [
    { text: 'Admin', value: true },
    { text: 'Member', value: false }
  ];
  userStatusList = [
    { text: 'Normal', value: 0 },
    { text: 'Pending', value: 1 },
    { text: 'Blocked', value: 2 }
  ];
  toolStatusList = [
    { text: 'Normal', value: 0 },
    { text: 'Pending', value: 1 },
    { text: 'Deleted', value: 2 }
  ];
  constructor(
    private userService: UserService,
    private timeService: TimeService,
    private toolService: ToolService,
    private message: NzMessageService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.userService.getAllUsers().subscribe(
      res => {
        this.users = res;
        this.displayedUsers = [...this.users];
      },
      err => {
        if (err.error === 'Unauthorized') {
          this.router.navigateByUrl('/notfound');
        }
      }
    );
    this.toolService.getAllTools().subscribe(res => {
      this.tools = res;
      this.displayedTools = [...this.tools];
    });
  }

  displayUserStatus(status) {
    switch (status) {
      case 0:
        return 'Normal';
      case 1:
        return 'Pending';
      case 2:
        return 'Blocked';
      default:
        return 'Unknown';
    }
  }

  displayGroup(isAdmin: boolean) {
    if (isAdmin) {
      return 'Admin';
    } else {
      return 'Member';
    }
  }

  displayToolStatus(status) {
    switch (status) {
      case 0:
        return 'Normal';
      case 1:
        return 'Pending';
      case 2:
        return 'Deleted';
      default:
        return 'Unknown';
    }
  }

  displayTime(time) {
    return this.timeService.convertGMTToLocalTime(time);
  }

  setTable(tableName) {
    this.currentTable = tableName;
  }

  sort(sortName: string, value: string): void {
    this.sortName = sortName;
    this.sortValue = value;
    // tslint:disable-next-line:forin
    for (const key in this.sortMap) {
      this.sortMap[key] = key === sortName ? value : null;
    }
    if (this.currentTable === 'users') {
      this.searchUsers(this.filterUserGroupList, this.filterUserStatusList);
    } else {
      this.searchTools(this.filterToolStatusList);
    }
  }

  searchUsers(filterGroups: string[], filterStatus: string[]): void {
    this.filterUserGroupList = filterGroups;
    this.filterUserStatusList = filterStatus;
    // filter data by keywords and filters
    const filterSearchFn = item => {
      return this.searchUsername.length
        ? item.includes(this.searchUsername.toLowerCase())
        : true;
    };
    const filterGroupFn = item => {
      return this.filterUserGroupList.length
        ? this.filterUserGroupList.some(group => item === group)
        : true;
    };
    const filterStatusFn = item => {
      return this.filterUserStatusList.length
        ? this.filterUserStatusList.some(status => item === status)
        : true;
    };
    const data = this.users
      .filter(item => filterSearchFn(item.username.toLowerCase()))
      .filter(item => filterGroupFn(item.isAdmin))
      .filter(item => filterStatusFn(item.status));
    // sort data
    if (this.sortName && this.sortValue) {
      this.displayedUsers = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1
      );
    } else {
      this.displayedUsers = data;
    }
  }

  searchTools(filterStatus: string[]): void {
    this.filterToolStatusList = filterStatus;
    // filter data by keywords and filters
    const filterSearchFn = item => {
      return this.searchToolName.length
        ? item.includes(this.searchToolName.toLowerCase())
        : true;
    };
    const filterStatusFn = item => {
      return this.filterToolStatusList.length
        ? this.filterToolStatusList.some(status => item === status)
        : true;
    };
    const data = this.tools
      .filter(item => filterSearchFn(item.name.toLowerCase()))
      .filter(item => filterStatusFn(item.status));
    // sort data
    if (this.sortName && this.sortValue) {
      this.displayedTools = data.sort((a, b) =>
        this.sortValue === 'ascend'
          ? a[this.sortName] > b[this.sortName]
            ? 1
            : -1
          : b[this.sortName] > a[this.sortName]
          ? 1
          : -1
      );
    } else {
      this.displayedTools = data;
    }
  }
  changeUserGroup(id: number, isAdmin: boolean) {
    this.userService.updateUserGroupById(id, isAdmin).subscribe(
      res => {
        const index = this.users.findIndex(user => user.userId === id);
        this.users[index]['isAdmin'] = isAdmin;
        this.searchUsers(this.filterUserGroupList, this.filterUserStatusList);
      },
      err => {
        this.message.error(err.error);
      }
    );
  }

  changeUserStatus(id: number, status: number) {
    this.userService.updateUserStatusById(id, status).subscribe(
      res => {
        const index = this.users.findIndex(user => user.userId === id);
        this.users[index]['status'] = status;
        this.searchUsers(this.filterUserGroupList, this.filterUserStatusList);
      },
      err => {
        this.message.error(err.error);
      }
    );
  }

  changeToolStatus(id: number, status: number) {
    this.toolService.updateToolStatusById(id, status).subscribe(
      res => {
        const index = this.tools.findIndex(tool => tool.toolId === id);
        this.tools[index]['status'] = status;
        this.searchTools(this.filterToolStatusList);
      },
      err => {
        this.message.error(err.error);
      }
    );
  }

  openToolPage(id: number) {
    // Open tool page in a new tab
    window.open('/tool/' + id, '_blank');
  }
}
