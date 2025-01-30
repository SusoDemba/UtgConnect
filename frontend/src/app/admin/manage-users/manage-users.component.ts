import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from './user.model';

@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.css'],
})
export class ManageUsersComponent implements OnInit {
  users: User[] = [];
  userForm: FormGroup;
  editingUser: User | null = null;
  errorMessage: string = '';
  successMessage: string = '';

  constructor(private http: HttpClient, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      role: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.fetchUsers();
  }

  fetchUsers(): void {
    this.http.get<User[]>('http://localhost:3000/api/users').subscribe(
      (response) => {
        this.users = response;
      },
      (error) => {
        this.errorMessage = 'Error fetching users';
      }
    );
  }

  addUser(): void {
    if (this.userForm.valid) {
      const user = this.userForm.value;
      this.http.post<User>('http://localhost:3000/api/users', user).subscribe(
        (response) => {
          this.successMessage = 'User added successfully';
          this.fetchUsers();
          this.userForm.reset();
        },
        (error) => {
          this.errorMessage = 'Error adding user';
        }
      );
    }
  }

  editUser(user: User): void {
    this.editingUser = user;
    this.userForm.patchValue(user);
  }

  updateUser(): void {
    if (this.userForm.valid && this.editingUser) {
      const updatedUser = this.userForm.value;
      this.http
        .put<User>(`http://localhost:3000/api/users/${this.editingUser.id}`, updatedUser)
        .subscribe(
          (response) => {
            this.successMessage = 'User updated successfully';
            this.fetchUsers();
            this.editingUser = null;
            this.userForm.reset();
          },
          (error) => {
            this.errorMessage = 'Error updating user';
          }
        );
    }
  }

  deleteUser(userId: string): void {
    this.http.delete(`http://localhost:3000/api/users/${userId}`).subscribe(
      () => {
        this.successMessage = 'User deleted successfully';
        this.fetchUsers();
      },
      (error) => {
        this.errorMessage = 'Error deleting user';
      }
    );
  }

  cancelEdit(): void {
    this.editingUser = null;
    this.userForm.reset();
  }
}
