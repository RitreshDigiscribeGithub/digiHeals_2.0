import { NzButtonModule } from "ng-zorro-antd/button";
import { NzCardModule } from "ng-zorro-antd/card";
import { NzDatePickerModule } from "ng-zorro-antd/date-picker";
import { NzDividerModule } from "ng-zorro-antd/divider";
import { NzFormModule } from "ng-zorro-antd/form";
import { NzGridModule } from "ng-zorro-antd/grid";
import { NzIconModule } from "ng-zorro-antd/icon";
import { NzInputModule } from "ng-zorro-antd/input";
import { NzLayoutModule } from "ng-zorro-antd/layout";
import { NzRadioModule } from "ng-zorro-antd/radio";
import { NzRateModule } from "ng-zorro-antd/rate";
import { NzSelectModule } from "ng-zorro-antd/select";
import { NzTagModule } from "ng-zorro-antd/tag";
import { NzDrawerModule } from 'ng-zorro-antd/drawer';

// Auth module
export function antForAuth() {
    return [NzLayoutModule, NzGridModule, NzInputModule, NzSelectModule, NzButtonModule, NzRadioModule, NzDatePickerModule];
}

// Share Component module
export function antForShareModule() {
    return [NzButtonModule, NzLayoutModule, NzGridModule, NzFormModule, NzIconModule, NzCardModule, NzRateModule, NzTagModule];
}

// Dashboard module
export function antForDashboard() {
    return [NzInputModule, NzIconModule, NzDividerModule, NzGridModule, NzButtonModule, NzRateModule, NzTagModule];
}

// HealsCart module
export function antForHealsCart() {
    return [NzGridModule, NzTagModule, NzIconModule, NzInputModule, NzButtonModule, NzDividerModule, NzSelectModule, NzDrawerModule];
}

//Chat module
export function antForChat() {
    return [NzGridModule, NzIconModule, NzInputModule, NzButtonModule, NzDividerModule, NzTagModule, NzDrawerModule];
}