# Generated by Django 4.2 on 2023-04-21 21:24

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('MyAPI', '0003_rename_users_user'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='User',
            new_name='test',
        ),
    ]
