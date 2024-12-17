<?php

namespace App\Enums;

enum EmploymentType: string
{
    case FullTime = 'Full Time';
    case PartTime = 'Part Time';
    case Contractor = 'Contractor';
    case Temporary = 'Temporary';
    case Intern = 'Intern';
    case Volunteer = 'Volunteer';
    case PerDiem = 'Per Diem';
    case Other = 'Other';
}
